import React from 'react';
import { gql, useQuery } from '@apollo/client';

interface Props {
  key: number; 
  img: string;
  name: string;
  price: number;
}

// interface State {
//   img: string | null;
//   name: string | null;
//   price: number | null;
// }

// TODO move queries to different file
const query = gql`
  query getCardInfo {
    category(input: {
      title: "all"
    }) {
      products {
        name
        gallery
      }
    }
  } 
`


export default class ProductCard extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    // this.state = {
    //   img: null,
    //   name: null,
    //   price: null
    // };
    // const { loading, error, data } = useQuery(query);
  }

  componentDidMount(): void {
    // const { loading, error, data} = useQuery(query);    
    // return { loading, error, data };
  }

  render() {
    return (
      <div>
        <img src={this.props.img} alt="Product photo" width="50%" height="50%"/>
        <span>{this.props.name}</span>
        <span>{this.props.price}</span>
      </div>
    )
  }
}
