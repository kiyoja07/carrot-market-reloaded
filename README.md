2024-08-21

#6.1 Validation Errors

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
