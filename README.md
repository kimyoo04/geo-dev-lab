# Geometry Blog

## 디렉토리 구조 (nextjs + FSD architecture)

> 참고 - https://velog.io/@teo/fsd

```
├── app/                    # Next.js App Router (루트 디렉토리)
│   ├── layout.tsx
│   └── page.tsx
├── middleware.ts          # Next.js 미들웨어
└── src/
    ├── app/              # FSD app layer
    │   ├── providers/    # React Query Provider, Supabase Provider
    │   └── styles/       # 글로벌 스타일 설정
    ├── entities/         # 도메인 모델 관련 로직
    │   ├── auth/
    │   ├── post/
    │   └── user/
    ├── features/         # 비즈니스 로직
    │   ├── auth/
    │   ├── post/
    │   └── user/
    └── modules/         # 재사용 가능한 복잡한 UI 블록 (widgets)
    ├── pages/           # 페이지 컴포넌트
    ├── shared/          # 공통 유틸리티
    │   ├── api/         # Supabase 클라이언트 설정
    │   ├── components/  # 공통 컴포넌트
    │   ├── config/      # 환경 변수 설정
    │   ├── hooks/       # 커스텀 훅
    │   ├── lib/         # 외부 라이브러리 설정
    │   ├── types/       # 타입 정의
    │   └── utils/       # 유틸 함수
```

- [github labels 한번에 적용하기](https://velog.io/@rimo09/Github-github-label-%ED%95%9C%EB%B2%88%EC%97%90-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0)
