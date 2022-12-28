import { useParams } from "react-router-dom";

export interface WithParamsProps {
  params: Record<string, string>;
}

export const withParams = <Props extends WithParamsProps>(
  WrappedComponent: React.ComponentType<Props>
) => {
  const WrapperComponent: React.FC<Omit<Props, keyof WithParamsProps>> = (
    props
  ) => {
    const params = useParams();

    return <WrappedComponent {...(props as Props)} params={params} />;
  };

  WrapperComponent.displayName = `withParams(${getDisplayName(
    WrappedComponent
  )})`;

  return WrapperComponent;
};

const getDisplayName = <Props extends WithParamsProps>(
  WrappedComponent: React.ComponentType<Props>
) => {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
};
