import React from "react";
import { useParams } from 'react-router-dom';

// TODO move to separate file if needed

interface WithParamsProps {
  params: Record<string, string>;
}

interface Props extends WithParamsProps {
}

const withParams = <Props extends WithParamsProps>(
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

class ProductDescription extends React.Component<Props, {}> {

  componentDidMount(): void {
    console.log(this.props);
  }

  render() {
    const id = this.props.params.id;
    return (
      <span>ProductDescription {id}</span>
    )
  }
};

export default withParams(ProductDescription);
