## 为自己站点配备免费Https(SSL)服务

1.[Let’s Encrypt](https://letsencrypt.org/)是一个免费的ssl证书供应商, [SSL For Free](https://www.sslforfree.com/)网站可以生成Let’s Encrypt的证书.不过Let’s Encrypt的凭证需要90天renew一次.<br/>
2.打开[SSL For Free](https://www.sslforfree.com/)输入域名,点击"Create Free SSL Certificate"<br/>
3.选择Manually Verify Domain,按照说明下载两个文本文件,并配两个链接,使测试的地址可以打开(注意以纯文本的方式打开,不是下载文件的格式).然后点
Download SSL Certificate<br/>
4.凭证产生后,在最后的成功页面输入用户名密码,注册用户.这样在快到期的时候会发邮件renew证书.点击Download All SSL Certificate Files下载会包含三个文件ca_bundle.crt, certificate.crt, private.key.<br/>
5.上传上面三个文件到远程服务器,比如~/ssl/路径下.给nginx增加ssl配置,比如我的配置是在/etc/nginx/conf.d/ssl.conf ,配置证书路径,并将访问代理到http服务的端口,比如3000,配置文件如下:

    server {
        listen       443;
        server_name  _;
        ssl                  on;
        ssl_certificate      ~/ssl/certificate.crt;
        ssl_certificate_key  ~/ssl/private.key;

        ssl_session_timeout  5m;

        ssl_protocols  SSLv2 SSLv3 TLSv1;
        #    ssl_ciphers  ALL:!ADH:!EXPORT56:RC4+RSA:+HIGH:+MEDIUM:+LOW:+SSLv2:+EXP;
        #    ssl_prefer_server_ciphers   on;

        #    location / {
        #        root   html;
        #        index  index.html index.htm;
        #    }
        location / {
	      proxy_pass http://127.0.0.1:3000;
        }
    }

6.sudo nginx -s reload使配置生效,这时候打开https://XXX就可以访问https的地址了,并且证书是被浏览器信任的(好像Android的某些浏览器会报证书安全的问题)
