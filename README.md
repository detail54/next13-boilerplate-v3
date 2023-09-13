# Next13 Boilerplate V3

## stack

---

```
- yarn v3.6.3 (yarn berry)
- next v13.4.19
- react v18.2.0
- env-cmd v10.1.0
- react-query v4.35.0 (react-query-devtools v4.35.0)
- the-new-css-reset v1.9.0
```

## Start

1. yarn berry 설정 (node.js v16.17.0 이상)

```
  - corepack enable
  - corepack prepare yarn@stable --activate
  - yarn set version berry
```

2. VSCode setup (VSCode에서만 적용)

```
  - yarn dlx @yarnpkg/sdks vscode
  - yarn plugin import interactive-tools

  *** import 에러발생시 추가 설정 ***
  - 아무 ts파일에서 ctrl+shift+p
  - Select TypeScript Version 선택
  - Use Workspace Version 선택
```

3. VSCode 익스텐션 ESLint, prettier 설치

4. 환경별 실행

- dev: yarn dev
- local: yarn build -> yarn start
- development: yarn build:dev -> yarn start:dev
- production: yarn build:production -> yarn start:production
- 실제 사용시 .gitignore에 .env파일들 주석 해제 해야함.

## Description

1. 컴포넌트 패턴

- Atomic 디자인 패턴을 적용하려 했으나, Atom과 block이라는 디렉터리 2가지로만 구분.
  - 이유
    1. 총 5단계의 Atomic패턴 적용시 컴포넌트 분리의 애매함으로 잦은 수정이 발생되어 개발 피로도 증가.
    2. 필요 이상으로 컴포넌트를 분리하게 되어 props drilling이 일어나 상태관리가 복잡해진다.
    3. 디자인이 미세하게 다를 경우에도 적절하게 컴포넌트들이 배치될 수 있도록 하려면 스타일을 분기처리하는 코드가 많아지는데 이 코드들이 굉장히 지저분해서 최소화 해야함.
    4. Molecules, Organisms 정도 레벨의 컴포넌트들을 모두 block 디렉터리에 작성해서 'app/[page]/\_components' 에 필요한 각 컴포넌트들을 조합한 실제 템플릿을 작성한다. 이렇게 하면 각 컴포넌트들을 필요에따라 유연하게 배치 할 수 있게되고 props drilling 또한 줄어들게 된다. 1,2,3번 문제 모두 어느정도 해결 가능.

2. api 호출

- 서버 통신은 next의 fetch를 사용하며 기본 설정된 옵션은 없음.
- 서버에서 받아온 데이터를 관리하기위해 React-Query를 사용. 기본설정은 src/common/api/reactQuery.ts 파일 참고.
- 에러처리의 경우 global, page단위, component단위 에서 각각 처리 할 수 있도록 하였음.
  - global => src/common/api/errors/default...... query와 metation의 기본 에러 핸들러에 에러처리 로직 작성.
  - page => 에러 핸들러를 추가로 작성하여 각 page의 react query데이터를 생성하는 hook에서 react query props에 errorHandlers 값에 핸들러 입력.
  - component => react query데이터를 생성하는 hook을 component에서 호출시 onError 함수 파라미터로 입력.
  - errorHandlers와 onError가 없을경우 global한 에러 핸들러 적용.
- api 호출 시점은 server와 client 모두 가능.
  - Server Components
    - src/common/api/pages/[page] 에 src/common/api/api.ts의 api() 함수를 호출하는 함수 작성.
    - 작성된 함수는 react query데이터를 생성하는 hook과 src/app/[page]/page.tsx 파일에서 호출할때 두 곳에서 사용.
    - src/app/[page]/page.tsx 파일에서 prefetchQuery 설정 하여 Hydrate로 컴포넌트를 감싼다. <br />( 두 곳에서 동일한 queryKey를 사용해야함. formatQueryKey util 함수 사용 )
  - Client Components
    - 'use client' 컴포넌트에서 react query데이터를 생성하는 hook사용.
