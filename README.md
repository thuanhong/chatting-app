# **Chatting-app**

## **Description**

---

Simple web application chatting using webRTC and Socket.io. Only available working with P2P(Peer to peer) connection with STUN server, currently not support TURN server.

### _Techonology using include_

![Nodejs](https://img.shields.io/badge/-Nodejs-black?style=flat-square&logo=Node.js)
![React](https://img.shields.io/badge/-React-black?style=flat-square&logo=react)
![NestJS](https://img.shields.io/badge/-NestJS-black?style=flat-square&logo=NestJS&logoColor=E0234E)
![NextJS](https://img.shields.io/badge/-NextJS-black?style=flat-square&logo=Next.js&logoColor=white)
![Docker](https://img.shields.io/badge/-Docker-black?style=flat-square&logo=docker)
![Socket](https://img.shields.io/badge/-socket.io-black?style=flat-square&logo=socket.io&logoColor=white)

## **Table of Contents**

- [Getting Started](#getting-started)
- [Usage](#usage)
- [Authors](#authors)
- [Acknowledgments](#acknowledgments)

## **Getting Started**

---

### Prerequisites

This is an example of how you may give instructions on setting up your project locally. To get a local copy up and running follow these simple example steps.

> npm

```properties
npm install npm@latest -g
```

> docker

```properties
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

### _Installation_

#### Clone Repository

```properties
git clone https://github.com/thuanhong/chatting-app

```

#### Server side

<br>

```properties
## change directory to folder backend/
npm install
docker-compose -f docker-compose.back-end.yml

```

#### Client side

```properties
## change directory to folder frontend/

npm install
```

## **Usage**

---

<br/>

### _Sign up_

<img src="assets/images/sign-up.png" alt='sign-up' width="70%" height="70%">
<br/>

### _Login_

<img src="assets/images/login.png" alt='login' width="70%" height="70%">
<br/>

### _Add contact_

<img src="assets/images/login.png" alt='login' width="70%" height="70%">
<br/>

### _Chat message_

<img src="assets/images/chat.png" alt='chat' width="70%" height="70%"/>
<br/>

### _Pick up phone call_

<img src="assets/images/pick-up-phone-call.png" alt='pick-up-phone-call' width="70%" height="70%"/>
<br/>

### _Feature video call_

<img src="assets/images/video-call-p2p.png" alt='video-call-p2p' width="70%" height="70%"/>
<br/>

## **Authors**

---

<img src="https://media-exp1.licdn.com/dms/image/C5103AQHFOFU6Lv_0AA/profile-displayphoto-shrink_200_200/0/1543484647260?e=1644451200&v=beta&t=6s4iC7aWhcTR7y2j0BM3_CloyfIhtmycVxatNiworhk" alt='video-call-p2p' width="15%" height="15%" style="border-radius:50%"/>
<br/>

Ho Tan Tai [![linkedin](https://img.shields.io/badge/-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/hotai1806)

<img src="https://media-exp1.licdn.com/dms/image/C5603AQFRVE4wq0DOUA/profile-displayphoto-shrink_800_800/0/1599664545851?e=1644451200&v=beta&t=OWHhkf7RaOBbGPAWsId0V1xPAMHU__JgaOfAjQLXfZk" alt='video-call-p2p' width="15%" height="15%" style="border-radius:50%"/>
<br/>

Hong Thanh Thuan

# Acknowledgments

Consult knowledge from all this pages

- [Socket io](https://socket.io/docs/v4/)

- [WebRTC](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API)
