# DoPic : AI 기반 두피 진단 및 관리 보조 서비스

---
## 🗂️ 개발 동기 및 목적

__1. 두피 질환 고민 증가 & 두피 관련 고민 연령대 확대__
 - 20대에서 50대 성인 62.3%가 헤어 및 두피 관련 고민 보유
 - 탈모증 질환 진료 인원 2020년 23만 3천명
 - 연령대별 진료 인원 20대 20.7%, 30대 22.2%

<br/>

__2. 필요성에 비해 소극적인 두피 관리__
 - 두피 관리 필요성 인식 79.8%
 - 두피 관리 실천 인원 20.7%
 - 월 평균 두피 관리 투자 시간 1시간 미만, 5만원 미만

<br/>

__3. 비용 부담과 정보 부족으로 관리의 어려움__
 - 2545 남성의 60%가 본인의 두피 유형을 모름
 - 정확한 두피 상태를 알지 못하면서 병원에도 가기 어려워함

 <br/>
 
__요약 : 두피 관리 방법을 잘 모르는 사람들을 위해 질환의 발현 초기부터 지속적인 관리를 도와주는 서비스 '두픽' 기획__

<br/>

---
## 📠 핵심 기능 설명 및 관련 문서


### 1. 두피 진단
 __1) 기능 명세__
  - 두피 유형 판단 모델을 활용하여, 사용자가 사진을 입력하면 그에 따른 각각의 두피 유형에 해당하는 정도와 종합적인 결과를 진단 받을 수 있음.
  - 두피 유형은 6가지로, 각각 비듬, 탈모, 미세각질, 피지, 모낭홍반농포, 모낭사이홍반가 있음.
  - 각각 유형의 정도에 따라 종합적인 결과가 도출됨.
 
 <details>
 <summary> __2) 관련 문서__ </summary>
  - UseCase Diagram
 <br/>
  ![image](https://github.com/Juyeori/DoPic/assets/98978787/ed7b6485-d12b-4b14-a34f-c75fb40a4d8c)
  <br/>
  - Activity Diagram
  ![image](https://github.com/Juyeori/DoPic/assets/98978787/7f5db738-39f5-4702-aea7-e50d1952e486)
  <br/>
  - Sequence Diagram
  ![image](https://github.com/Juyeori/DoPic/assets/98978787/a4ce2a73-5a5b-4745-bff4-b1a9e1b147de)
  </details>
<br/>

### 2. 두피 일기장
 __1) 기능 명세__
  - AI 두피 진단 기록이 자동으로 사용자 캘린더에 저장됨<br/>
  - 진단 기록 이외에도, 해당 날짜에 사용자의 추가적인 입력(ex: 수면 시간, 스트레스 정도, 사용 헤어 케어 제품 등)을 할 수 있음<br/>
  - 일기장의 기대효과로는, 진단 기록과 더불어, 두피에 대한 사용자의 생활 습관을 기록하며 두피에 좋은 생활 습관으로 개선할 수 있도록 유도함. (ex : 어떤 생활 습관으로 계속 지내다보니, 두피가 개선되었다는 것을 파악하는 것)<br/>

<details>
 <summary>2) 관련 문서</summary>
  - UseCase Diagram<br/>
  ![image](https://github.com/Juyeori/DoPic/assets/98978787/0f7f4db2-98c2-4b38-970e-1767dcc26eaa)
  <br/>
  - Activity Diagram<br/>
  ![image](https://github.com/Juyeori/DoPic/assets/98978787/7a88c27a-af3e-489d-be70-3ba60e43881b)
  <br/>
  - Sequence Diagram<br/>
  ![image](https://github.com/Juyeori/DoPic/assets/98978787/b28830ab-2087-426c-9281-27c5703c0b54)
 <br/>
</details>
<br/>

### 3. 맞춤 제품 추천
 1) 기능 명세
  - 두피 진단 유형에 따른 헤어 케어 제품을 추천 <br/>
  - 현재, 탈모 관련 상품이 어떠한 두피 유형이든 도움이 되는 관계로, 알고리즘 관련 재논의중.<br/>

<details>
 <summary>2) 관련 문서</summary>
  - UseCase Diagram<br/>
  ![image](https://github.com/Juyeori/DoPic/assets/98978787/fc48e10f-c636-4da3-b0a9-dbc96f74d9a5)
</details>
<br/>
  
---
## 🕋팀 정보 (Team Information)


<table>
 <tr>
  <td></td>
  <td>Name</td>
   <td>ID</td>
  <td>Role</td>
  <td>github</td>
  <td>e-mail</td>
 </tr>
   
 <tr>
  <td align='center'><img src="https://avatars.githubusercontent.com/u/77771635?v=4" width="50" height="50"></td>
  <td align='center'>Jihui Song</td>
  <td align='center'>201821413</td>
  <td align='center'>PM / UI/UX</td>
  <td align='center'><a href="https://github.com/tjdnjf47"><img src="http://img.shields.io/badge/tjdnjf47-green?style=social&logo=github"/></a></td>
  <td align='center'><a href="mailto:tjdnjf47@ajou.ac.kr"><img src="https://img.shields.io/badge/seojune408@gmail.com-green?logo=gmail&style=social"/></a></td>
 </tr>
 
 <tr>
  <td align='center'><img src="https://avatars.githubusercontent.com/u/109195660?v=4" width="50" height="50"></td>
  <td align='center'>Sungju Cho</td>
  <td align='center'>201821518</td>
  <td align='center'>AI Model</td>
  <td align='center'><a href="https://github.com/CastleCho"><img src="http://img.shields.io/badge/CastleCho-green?style=social&logo=github"/></a></td>
  <td align='center'><a href="mailto:ghcho333@ajou.ac.kr"><img src="https://img.shields.io/badge/ghcho333@ajou.ac.kr-green?logo=gmail&style=social"/></a></td>
 </tr>

 <tr>
  <td align='center'><img src="https://user-images.githubusercontent.com/98978787/226175108-63792c9b-1d80-45f9-958c-b1d2824f64f1.png" width="50" height="50"></td>
  <td align='center'>Juyeon Lee</td>
  <td align='center'>201821488</td>
  <td align='center'>App Client / Server</td>
  <td align='center'><a href="https://github.com/Juyeori"><img src="http://img.shields.io/badge/Juyeori-green?style=social&logo=github"/></a></td>
  <td align='center'><a href="mailto:dlwndus0728@ajou.ac.kr"><img src="https://img.shields.io/badge/dlwndus0728@ajou.ac.kr-green?logo=gmail&style=social"/></a></td>
 </tr>
</table>

---
## Github Repo

* 백엔드(node.js) : https://github.com/Juyeori/dopic_server
* AI모델(Fast API, Pytorch) : https://github.com/Juyeori/dopic_api

---
## 💽로컬 설치 안내(Installation Process)

```bash
git clone https://github.com/juyeori/dopic.git

npm install
```

---
## 🗂️가상 환경 실행 안내

```bash
npx react-native run-android
```

---
## 🗂️실제 기기 실행 안내

```bash
adb reverse tcp:8080 tcp:8080
```

```bash
npx react-native run-android
```
