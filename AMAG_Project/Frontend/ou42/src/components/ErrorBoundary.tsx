import React, { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  fallback: React.ElementType;
}

interface State {
  hasError: boolean;
}
const initialState: State = {
  hasError: false,
};

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = initialState;
  }

  public static getDerivedStateFromError(error: any): State {
    // 다음 렌더링에서 폴백 UI가 보이도록 상태를 업데이트 합니다.
    if (error.response.status === 403) {
      localStorage.removeItem("loginInfo");
    }
    return { hasError: true };
  }

  public render() {
    const { hasError } = this.state;

    if (hasError) {
      return <this.props.fallback />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
