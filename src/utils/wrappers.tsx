import { useParams } from "react-router-dom"; 

export interface WithParamsProps {
  params: Record<string, string>;
}

export const withParams = <Props extends WithParamsProps>(
  WrappedComponent: React.ComponentType<Props>
) => {
  return (props: Omit<Props, keyof WithParamsProps>) => {
    const params = useParams();

    return (
      <WrappedComponent
        {...(props as Props)}
        params={params}
      />
    )
  }
}
