2024-08-02

#3.8 Lists and Animations

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
