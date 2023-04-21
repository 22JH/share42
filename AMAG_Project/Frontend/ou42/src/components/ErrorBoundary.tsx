import React, { ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
  fallback: React.ElementType;
}

interface State {
  hasError: boolean;
  error: Error | null;
}
const initialState: State = {
  hasError: false,
  error: null,
};

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = initialState;
  }

  public static getDerivedStateFromError(error: Error): State {
    // 다음 렌더링에서 폴백 UI가 보이도록 상태를 업데이트 합니다.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // 에러 리포팅 서비스에 에러를 기록할 수도 있습니다.
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    const { hasError, error } = this.state;

    if (hasError) {
      return (
        <>
          <this.props.fallback error={error} />
          <button>재시도</button>
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
