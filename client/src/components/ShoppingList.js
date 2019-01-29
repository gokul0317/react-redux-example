import React,{Component} from 'react';
import {Container, ListGroup, ListGroupItem, Button} from 'reactstrap';
//import {CSSTransition, TransitionGroup } from 'react-transition-group';


import {connect} from 'react-redux'
import {getItems,deleteItem} from '../actions/itemActions';

import PropTypes from 'prop-types';

class ShoppingList extends Component{

    componentDidMount(){
        this.props.getItems();
    }
  
    onDelete = (id)=>{
        this.props.deleteItem(id);
    }
    render(){
        const {items} = this.props.item;  
        return(
            <Container>
            <ListGroup>         
                   {items.map(({ _id,name }) =>(                  
                    <React.Fragment   key={_id} >
                              <ListGroupItem >
                                  <Button className="remove-btn" onClick={ this.onDelete.bind(this,_id)
                                    }
                                    
                                    color="danger" size="sm">
                                    &times;
                                  </Button>
                                  {name}

                             </ListGroupItem>
            </React.Fragment>
    

            //   </CSSTransition>
                 )) }

              

            </ListGroup>


            </Container>
        );
    }

}

ShoppingList.prototypes = {
    getItems : PropTypes.func.isRequired,
    item : PropTypes.object.isRequired
}


const mapStateToProps = (state) => ({
    item : state.item
})

export default connect(mapStateToProps, { getItems,deleteItem })(ShoppingList);