# Next13 Boilerplate V3

## Dependencies

---

```
- yarn v3.6.3 (yarn berry)
- next v13.4.19
- react v18.2.0
- env-cmd v10.1.0
- react-query v4.35.0 (react-query-devtools v4.35.0)
- recoil v0.7.7
- vanilla-extract v1.13.0
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

1. <strong>Directory Structure</strong>

- app: 실제 브라우저에 그려질 페이지. Next app directory의 File Conventions의 파일들만 위치 시킨다.<br />
  (참고: https://nextjs.org/docs/app/building-your-application/routing)
- \_pages: app 디렉터리에 넣지 못하지만 해당 페이지를 구성하기 위해 필요한 파일들을 위치시킨다. page별로 분리하고 그 안에 용도별로 한번 더 분리. 한 페이지 수정 시 여러 디렉터리를 옮겨가지 않아도 되게 하나로 묶어놓음.
- common: 공통적으로 사용될 파일들.

```
└── src
    ├── _pages
    │   └── [page]
    │       ├── components
    │       │   └── ....
    │       ├── state
    │       │   ├── client
    │       │   │   └── recoil.ts
    │       │   └── server
    │       │       ├── fetchers.ts
    │       │       └── querys.ts
    │       └── type
    │           └── type.d.ts
    │       ....
    ├── app
    │   ├── [page]
    │   │   ├── layout.tsx
    │   │   └── page.tsx
    │   ├── globals.css
    │   ├── favicon.ico
    │   ├── layout.tsx
    │   └── page.tsx
    └── common
        ├── api
        │   ├── errors
        │   │   ├── defaultMutationErrHandlers.ts
        │   │   ├── defaultQueryErrHandlers.ts
        │   │   ├── errorsType.d.ts
        │   │   └── index.ts
        │   ├── api.ts
        │   ├── reactQuery.ts
        │   └── type.d.ts
        ├── components
        │   ├── atom
        │   │   └── [component name]
        │   │       ├── component.ts
        │   │       └── componentType.d.ts
        │   │       ....
        │   └── block
        │       └── [component name]
        │           ├── component.ts
        │           └── componentType.d.ts
        │           ....
        ├── config
        │       └── [config name]
        │           └── ....
        ├── constant
        │       └── ....
        └── utils
                └── ....
```

2. <strong>컴포넌트 패턴</strong>

- Atomic 디자인 패턴을 적용하려 했으나, Atom과 block이라는 디렉터리 2가지로만 구분.
  - 이유
    1. 총 5단계의 Atomic패턴 적용시 컴포넌트 분리의 애매함으로 잦은 수정이 발생되어 개발 피로도 증가.
    2. 필요 이상으로 컴포넌트를 분리하게 되어 props drilling이 일어나 상태관리가 복잡해진다.
    3. 디자인이 미세하게 다를 경우에도 적절하게 컴포넌트들이 배치될 수 있도록 하려면 스타일을 분기처리하는 코드가 많아지는데 이 코드들이 굉장히 지저분해서 최소화 해야함.
    4. Molecules, Organisms 정도 레벨의 컴포넌트들을 모두 block 디렉터리에 작성해서 '\_pages/[page]/components' 에 필요한 각 컴포넌트들을 조합한 실제 템플릿을 작성한다. 이렇게 하면 각 컴포넌트들을 필요에따라 유연하게 배치 할 수 있게되고 props drilling 또한 줄어들게 된다. 1,2,3번 문제 모두 어느정도 해결 가능.

3. <strong>api 호출</strong>

- 서버 통신은 next의 fetch를 사용하며 기본 설정된 옵션은 없음.
- 서버에서 받아온 데이터를 관리하기위해 React-Query를 사용. 기본설정은 src/common/api/reactQuery.ts 파일 참고.
- 에러처리의 경우 global, page단위, component단위 에서 각각 처리 할 수 있도록 하였음.
  - global => src/common/api/errors/default...... query와 metation의 기본 에러 핸들러에 에러처리 로직 작성.
  - page => 에러 핸들러를 추가로 작성하여 각 page의 react query데이터를 생성하는 hook에서 react query props에 errorHandlers 값에 핸들러 입력.
  - component => react query데이터를 생성하는 hook을 component에서 호출시 onError 함수 파라미터로 입력.
  - errorHandlers와 onError가 없을경우 global한 에러 핸들러 적용.
- api 호출 시점은 server와 client 모두 가능.<br />
  https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#when-to-use-server-and-client-components 참고하여 서버와 클라이언트 패칭 시점 지정.
  - Server Components
    - src/common/api/pages/[page] 에 src/common/api/api.ts의 api() 함수를 호출하는 함수 작성.
    - 작성된 함수는 react query데이터를 생성하는 hook과 src/app/[page]/page.tsx 파일에서 호출할때 두 곳에서 사용.
    - src/app/[page]/page.tsx 파일에서 prefetchQuery 설정 하여 Hydrate로 컴포넌트를 감싼다. <br />( 두 곳에서 동일한 queryKey를 사용해야함. formatQueryKey util 함수 사용 )
  - Client Components
    - 'use client' 컴포넌트에서 react query데이터를 생성하는 hook사용.

4. <strong>state 관리</strong>

- server state
  - 위에 작성된 api 호출 내용에서처럼 React Query로 서버상태를 관리한다.
- client state
  - Recoil을 사용. 클라이언트에서 사용될 모든 state를 관리.<br />
    <strong>** 한개의 컴포넌트에서만 사용되거나 1depth의 props를 넘겨주는 경우 state는 React.useState로 관리하고 2개 이상의 컴포넌트에서 사용되거나 2depth이상의 props를 넘겨줘야하는 경우 state는 Recoil로 관리한다 **</strong>

5. <strong>스타일</strong>

- the-new-css-reset적용하여 스타일 리셋 함.
- 리셋 싫으면 라이브러리 지우고 노멀라이즈로 대체 하면됌.
- vanilla-extract 사용.
- global style은 app/global.css.ts 에만 작성.
- 그외 각 컴포넌트 tsx파일과 같은 경로에 파일생성하여 작성.

# etc...

- 공통 컴포넌트는 최대한 작은 단위로 구성하는걸 목적으로 하기때문에 Story Book 같은거 추가해도 그렇게 부담안되고 좋을듯?
