# WeekMenu

1. Install python3.7 + install pip environment and dependencies
```
pip3 install -r requirements.txt
```
3. Install apache2 + add following to /etc/apache2.conf

```
<Directory "/var/www/html/api">
    # Only needed for localhost development reasons or when site is being hosted on different domain
    #Header set Access-Control-Allow-Origin "*"
    #Header set Access-Control-Allow-Headers "Content-Type"
    
    Options None
    Require all granted
    Options +ExecCGI
    AddHandler cgi-script .py
</Directory> 
```
3. Add refer /api to absolute path on server in your site.conf

```
Alias /api /var/www/html/api/menu.py
```
