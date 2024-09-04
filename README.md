
## Getting Started

clone repo and set env varibales
```
export MY_EMAIL=
export MY_PASSWORD=
export AWS_ACCESS_KEY_ID=
export AWS_SECRET_ACCESS_KEY=
export AWS_BUCKET=
export AWS_REGION=
```

```bash
npm install
npm run biild
```
## Start build

use native
```
npm start
```
use pm2 
```
npm install pm2 -g
pm2 start npm --name art-next -- run start -- -p 3000
```

To stop process
```
pm2 stop art-next
```
To restart
```
pm2 restart art-next
```
To delete
```
pm2 delete art-next
```