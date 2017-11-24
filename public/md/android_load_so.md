## Android动态加载so文件

#####背景
项目中用到了[vuforia](https://vuforia.com/)这个三方AR框架实现对应的功能,关于vuforia相关的不做介绍,需要引用对应的一个jar包(200k+)和一个so包(12m+),如果同放进工程打包到Apk会使包体积急速扩大,所以考虑jar打包动态加载so的方案.

#####so和CPU架构
c/cpp文件一般会根据不同的CPU平台生成不同类的so文件,使用的时候放到不同的目录下(armeabi,armeabi-v7a,X86等),但是大部分平台都会兼容armeabi的类型,所以最粗暴的方法是只使用armeabi下的so供全平台使用.这里可以通过gradle中配置ndk.abiFilters指定使用的平台.<br/>

#####so的动态加载
这里网上很多文章都有大概总结下思路就是:<br/>
1. 网络下载 so 文件到指定目<br/>
2. 从指定下载的目录复制 copy so文件到可动态加载的文件目录<br/>
3. 配置 gradle ，指定 cpu 架构<br/>
4. load 加载<br/>

#####load与loadLibrary
void System.load(String pathName);<br/>
参数为路径的名字,一般是当前应用的安装的目录/data/data/<packageName>(/data/user/0/<packageName>)<br/>
void loadLibrary(String libname)<br/>
参数为库的名字(不包括后缀.so)库名为随着apk打包进来的库名.<br/><br/>
这里我们使用load加载,遇到的一个坑:虽然gradle指定了ndk.abiFilters为armeabi,但是load得时候还会报UnsatisfiedLinkError ****32-bit instead of 64-bit这时候需要在libs的armeabi放对应cpu的so包,如果还报错可能原因摘抄如下<br/>
>1.所有的App在运行时,都是由Zygote进程创建VM再运行的.<br/>
2.一般设备只支持32位系统,但有些新设备已经支持64位(同时兼容32位).对于这些新设备来说，有两个Zytgote(一个32位，一个64位)进程同时运行.<br/>
3.当App运行在64位系统上,又区分以下三种情况: <br/>
  1、如果App只包含64位的so库,则它将运行在一个64位的进程中,即VM是由Zytgote 64创建的.<br/>
2、如果App包含32位的so库,则它将运行在一个32位的进程中,即VM是由Zytgote创建的.<br/>
3、如果App不包含任何so库,则它将默认运行在64位的进程中.<br/>

有可能是情况3,解决方法如下<br/>
>先把一个32位的so文件打进安装包,其它so库在运行时动态加载,这样App启动的是32位进程,动态加载的so库也是32位版本<br/>

#####jar包的修改
以上就实现的将so动态加载进来了,这里顺便说一句load过程是很快的,我这12m的so时间大概是ms级别的.如果要裸掉native方法到这里就结束了.<br/>
不过在当前的使用中我们是通过调用jar的方法间接调用so的native方法的,而jar中大部分是通过static{loadLibrary()}方法引入的(默认会随着工程打包进来,然后loadLibrary),所以在当前场景下[vuforia](https://vuforia.com/)需要(删除)修改jar中的加载方法,手动调用自己的load从硬盘中加载.<br/>
修改jar的方法:<br/>
1. 将jar包解压目录(如test),通过JD-GUI查找需要修改的class类.<br/>
2. 创建一个一样包名,类名的.java文件,把.class的文件复制进去,修改对应的地方.<br/>
3. build成.class文件,在test中复制替换掉原来的.class<br/>
4. 重新打包成jar:进入目录jar cvf test.jar . 重命名test.jar为目标名字.<br/>
5. 替换工程中的jar包,这时候就可以工作了.


#####参考 <br/>
> [http://godcoder.me/2017/03/29/Android%20%E5%BC%80%E5%8F%91%E4%B8%AD%E5%A6%82%E4%BD%95%E5%8A%A8%E6%80%81%E5%8A%A0%E8%BD%BDso%E5%BA%93%E6%96%87%E4%BB%B6/](http://godcoder.me/2017/03/29/Android%20%E5%BC%80%E5%8F%91%E4%B8%AD%E5%A6%82%E4%BD%95%E5%8A%A8%E6%80%81%E5%8A%A0%E8%BD%BDso%E5%BA%93%E6%96%87%E4%BB%B6/) <br/>
> [http://blog.csdn.net/aqi00/article/details/72763742](http://blog.csdn.net/aqi00/article/details/72763742) <br/>
> [http://blog.csdn.net/junjie319/article/details/43601287](http://blog.csdn.net/junjie319/article/details/43601287)