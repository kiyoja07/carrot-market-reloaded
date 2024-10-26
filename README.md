2024-10-26

#15.1 Models

# nexjs 최신 버전 설치

npx create-next-app@latest

# Tailwind

Responsive

```
sm 640px @media (min-width: 640px) { ... }
md 768px @media (min-width: 768px) { ... }
lg 1024px @media (min-width: 1024px) { ... }
xl 1280px @media (min-width: 1280px) { ... }
2xl 1536px @media (min-width: 1536px) { ... }
```

형제 요소의 상태에 따라 요소의 스타일을 지정해야 하는 경우 형제를 peer 클래스로 표시하고 peer-invalid와 같은 peer-\* 수정자를 사용하여 대상 요소의 스타일을 지정합니다.

:has() 수도 클래스는 최초로 부모를 기준으로 하는 것이 아니라 자식을 기준으로 요소의 스타일을 지정할 수 있습니다.

Animation
https://tailwindcss.com/docs/animation

상위 상태에 따른 스타일 지정(group-{modifier})

일부 상위 요소의 상태를 기반으로 요소의 스타일을 지정해야 하는 경우 상위 요소를 group 클래스로 표시하고 group-hover와 같은 group-\* 수정자를 사용하여 대상 요소의 스타일을 지정합니다.

daisyUI
Tailwind CSS용 가장 인기있는 컴포넌트 라이브러리, https://daisyui.com

# React

useFormStatus
useFormStatus는 마지막 form submit의 상태 정보를 제공하는 Hook입니다.
ex) const { pending, data, method, action } = useFormStatus();
https://react.dev/reference/react-dom/hooks/useFormStatus

useFormState
useFormState는 form action의 결과에 따라 상태를 업데이트할 수 있는 Hook입니다.
ex) const [state, formAction] = useFormState(fn, initialState, permalink?);
https://react.dev/reference/react-dom/hooks/useFormState

# zod : 스키마 선언 및 유효성 검사 라이브러리

**zod를 사용하는 이유**
typescript의 유효성 검증은 컴파일 시에만 발생.
실제로 자바스크립트 프로그램이 실행 될 때는 아무런 역할을 하지 못함.
⇒ zod의 유효성 검증은 컴파일이 끝난 프로그램의 실행 시점에서 발생

파싱

- parse() : 스키마를 기준으로 데이터의 유효성 확인
- parseAsync() : 비동기 정제를 사용하는 경우 parseAsync를 사용해야 함
- safeParse() : 유효성 검사에 실패해도 오류를 던지지 않음.
- safeParseAsync() : safeParse의 비동기버전. 편의상 .spa() 로도 사용 가능

- loading.tsx : 로딩 중 일 때 화면

## Code Challenge

#9.4 Code Challenge :

#9.8 Code Challenge :

#12.7 Modal UI

- modal의 close button을 client 컴포넌트로 분리
- modal의 상품을 검색해서 상품 상세 정보를 보여준다.

#13.12 Code Challenge

- 캐싱 전략을 짜고 상품 업로드, 수정, 삭제할 때마다 바로 반영되도록 하기
- 상품 수정 페이지 만들기

#14.5 Recap

- https://github.com/elian118/carrot-market-reloaded/commit/0ac7135181946df332ea24c60b751a52118c0695#diff-4ade2acfa9957a5c67cf37a05e766f7d0c38350957a815327b50238df3054cc6R22
- 댓글 섹션 만들기
