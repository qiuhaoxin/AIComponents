import React,{Component} from 'react';
import './index.less';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';


const prefixCls='ai-tip';
class Tip extends Component{
   constructor(props){
      super(props);
   }
   state={

   }
   handleClick=()=>{
   	  const {onClick,data}=this.props;
   	  if(onClick)onClick(data);
   }
   render(){
      const {className,style,icon,tipStr,content,visible}=this.props;
      const visibleClass=visible ? `${prefixCls}show` : `${prefixCls}hide`;
      const classNames=ClassNames({
        [`${prefixCls}-show`]:visible,
        [`${prefixCls}-hide`]:!visible,
      },`${prefixCls}-wrapper`)
   	  return (
        <div style={style} className={classNames} onClick={this.handleClick}>
            <div className={`${prefixCls}-contentRow`}>
                {icon && typeof icon =='string' ? <img src={icon}/> : icon ? {icon} : null}
                <div className={`${prefixCls}-content`}>
                    {content}
                </div>
            </div>
            {
            	tipStr ? <div className={`${prefixCls}-tipRow`}>{tipStr}</div> :null
            }
        </div>
   	  )
   }
}
Tip.defaultProps={  
   tipStr:'点击或说出"填写出差申请"即可继续',
   visible:false,
   data:{},
}
Tip.propTypes={
   tipStr:PropTypes.string,
   visible:PropTypes.bool,
   data:PropTypes.object  
}
export default Tip;