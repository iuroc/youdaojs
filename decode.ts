import * as crypto from 'crypto'

const key = crypto.createHash('md5').update('ydsecret://query/key/B*RGygVywfNBwpmBaZg*WT7SIOUP2T0C9WHMZN39j^DAdaZhAnxvGcCY6VYFwnHl').digest()
const iv = crypto.createHash('md5').update('ydsecret://query/iv/C@lZe2YzHtZ2CYgaXKSVfsb7Y4QWHjITPPZ0nQp87fBeJ!Iv6v^6fvi2WN@bYpJ4').digest()
const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv)
let decrypted = decipher.update('_jsUyA02rwkOJ4enKX7c4dhd7CjvGkcKfbRx0BjNGW-dcvaD6EpAgvZvxnkUgFEU59LtR2OzMA48f0AO3-4Rb540C53MpHr_nhpSfFBK_J4ERxr2WMX97Ws7eIgsGILh5qac_A1LWDz7dozv8sQKZdns_SInqk8l7IHCqjBCfciY2aFP4FsRefvyIKtjZ3jZvj4e-Q5AOMYLgMGsIzjODwN5fPdICuomyNZDreMaXWg532uYYzTKyCobBV6Ug98IRuHQzF6_70PVNpF3U6VxPg==', 'base64', 'utf8')
decrypted += decipher.final('utf8')
console.log(decrypted)
