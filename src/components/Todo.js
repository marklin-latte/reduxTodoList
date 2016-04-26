import React, { Component, PropTypes }      from 'react';
import { connect }                          from 'react-redux';
import { bindActionCreators }               from 'redux';
import * as TodoAction                      from '../actions/';
import classNames                           from 'classnames'

class Todo extends Component {
    constructor(props, context) {
        super(props, context);
        this.changeContent = this.changeContent.bind(this);
        this._handleKeyPress = this._handleKeyPress.bind(this);
    }

    state = {
      isEdit:false,
      iconHover:false,
      itemHover:false,
      text:this.props.text
    }

    handleIconHover (action) {
      if(action === 'leave' && !this.state.iconHover){
        return;
      }
      this.setState({iconHover: !this.state.iconHover});
    }

    handleItemHover (action) {
      if(action === 'leave' && !this.state.itemHover){
        return;
      }
      this.setState({itemHover: !this.state.itemHover});
    }

    changeContent (event){
      this.setState({text: event.target.value});
    }

    _handleKeyPress (e){
      if (e.key === 'Enter') {
            // this.setState({isEdit: false});
            if(this.state.text === '') return;
            this.props.editTodo();
            this.props.textUpdate(this.state.text);
          }
    }

    render() {
        const toggleTodo = this.props.toggleTodo;
        const deleteTodo = this.props.deleteTodo;
        const toggleStarTodo = this.props.toggleStarTodo;
        const editTodo = this.props.editTodo;
        let text = this.state.text;
        let trashIcon = ( <a href="javascript:" onClick={ deleteTodo } className="ctrlIcon">
                            <i className="fa fa-trash fa-2x" aria-hidden="true"></i>
                          </a> );
        let starIcon = ( <a href="javascript:" onClick={ toggleStarTodo } className={classNames({ 'stared': this.props.star},'ctrlIcon')} >
                          <i className={classNames({ 'fa-star-o': !this.props.star , 'fa-star': this.props.star},'fa','fa-2x')}
                            aria-hidden="true"></i>
                        </a> );

        // onDoubleClick={ ()=> this.setState({isEdit: true})}
        // let ItemText = ( <a href="javascript:" onClick={ ()=> this.setState({isEdit: true}) }>
        //                   <p className={ classNames({ 'complete': this.props.completed , 'textHover' : this.state.iconHover}, 'text' )}>
        //                     {text}
        //                   </p>
        //                  </a> );
        let ItemText = ( <a href="javascript:" onClick={
                                                  () => {
                                                    if(this.props.isEdit) return;
                                                    editTodo();
                                                  }
                                                }>
                          <p className={ classNames({ 'complete': this.props.completed , 'textHover' : this.state.iconHover}, 'text' )}>
                            {text}
                          </p>
                         </a> );

        let itemToggle = (<a href="javascript:"
                              onClick={
                                () => {
                                  if(this.props.isEdit) return;
                                  toggleTodo();
                                }
                              }
                              onMouseEnter={this.handleIconHover.bind(this,'enter')}
                              onMouseLeave={this.handleIconHover.bind(this,'leave')}
                              className="textIcon">
                              <i className={classNames({
                                              'fa-genderless': !this.state.iconHover,
                                              'fa-check-circle': this.state.iconHover
                                            },'fa','fa-3x')}
                                  aria-hidden="true"></i>
                            </a>);
        // Completed
        if(this.props.completed){
          itemToggle = (<a href="javascript:"
                            onClick={ toggleTodo }
                            className={classNames({ 'complete': this.props.completed},'textIcon')}>
                            <i className="fa fa-check-circle fa-3x" aria-hidden="true"></i>
                          </a>);
          ItemText = ( <span href="javascript:">
                        <p className={ classNames({ 'complete': this.props.completed}, 'text' )}>
                          {text}
                        </p>
                       </span> );
          trashIcon = '';
        }
        // Edit
        if(this.props.isEdit){
            if(this.props.editCurrent) {
              ItemText = (<input className="text"
                                style={{cursor: 'pointer'}}
                                ref={ input => {
                                      if(input === null) return;
                                        input.focus();
                                    }}
                                type='text' value={text}
                                onChange={ this.changeContent }
                                onblur={ this._handleKeyPress }
                                onKeyPress = {this._handleKeyPress}/>);
              itemToggle = (<span className={classNames({ 'complete': this.props.completed},'textIcon')}
                                  style={{'color': '#717677'}}>
                                <i className="fa fa-genderless fa-3x" aria-hidden="true"></i>
                              </span>);
            }
        }
        // Hover
        if(!this.state.itemHover || this.props.isEdit){
          if(!this.props.star){
            starIcon='';
          }
          trashIcon = '';
        }
        return (
          <ul className="clearfix" onMouseEnter={this.handleItemHover.bind(this,'enter')} onMouseLeave={this.handleItemHover.bind(this,'leave')}>
            <li className="item">
                <div className="item-content">
                    {itemToggle}
                    {ItemText}
                </div>
                <div className="item-ctrl">
                    {starIcon}
                    {trashIcon}
                </div>
            </li>
          </ul>
        )
    }
}

export default Todo;
