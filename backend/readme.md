# backend

## Resource

- [Express 簡易 passport + jwt 認證](https://medium.com/karinsu/express-%E7%B0%A1%E6%98%93-passport-jwt-%E8%AA%8D%E8%AD%89-9472e35b5d43)

## Testing

### Signin

- Request

```sh
curl -X POST http://localhost:3000/signin \
-H "Content-Type: application/json" \
-d '{"username":"admin","password":"1234"}' \
-v
```

- Response

```text
< HTTP/1.1 200 OK
< X-Powered-By: Express
< Content-Type: application/json; charset=utf-8
< Content-Length: 242
< ETag: W/"f2-apfvZrJcFwykwNaCSm69Yg2SRQM"
< Date: Sun, 19 Jan 2025 06:17:48 GMT
< Connection: keep-alive
< Keep-Alive: timeout=5
<
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6IiQyYiQxMCRLbS96NTRCOGhFZ0RWeTB1eTNqNnF1Y0JMWUZhM1BGTkhvNmwvVTFydWI0UlB5RDg5cWFNaSIsImlhdCI6MTczNzI2NzQ2OH0.yUVSBqBL31_nI-cqc1XnRhRQex6XzLTvktGEzQyPCiQ"* Connection #0 to host localhost left intact
```

### Auth

- Request

```sh
curl -X GET http://localhost:3000 \
-H "Content-Type: application/json" \
-d '{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6IiQyYiQxMCRLbS96NTRCOGhFZ0RWeTB1eTNqNnF1Y0JMWUZhM1BGTkhvNmwvVTFydWI0UlB5RDg5cWFNaSIsImlhdCI6MTU0MDk0NzkyMn0.mIGG-9laKV2VS-LTiR0vRDDdKAFRXUATmre0NyElHvQ"}' \
-v
```

- Response

```sh
< HTTP/1.1 200 OK
< X-Powered-By: Express
< Content-Type: application/json; charset=utf-8
< Content-Length: 9
< ETag: W/"9-D5Qd9FW/fsMQJ/dx8nLVGxKDEeI"
< Date: Sun, 19 Jan 2025 10:19:48 GMT
< Connection: keep-alive
< Keep-Alive: timeout=5
<
"success"* Connection #0 to host localhost left intact
```
