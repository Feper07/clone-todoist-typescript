
  import React from 'react';
  import "../style-sheets/TitleComponent.css"

  import { HiMenu } from "react-icons/hi";
  import { BiPlus  } from "react-icons/bi";
  import { BiPieChart } from "react-icons/bi";
  import { VscNewFile } from "react-icons/vsc";
  import { TbHome } from "react-icons/tb"; 
  import { CiSearch } from "react-icons/ci";
  import { BsQuestionSquare } from "react-icons/bs";

  import { BsFillStarFill } from "react-icons/bs";

  function TitleComponent() { 
    return ( 
      <div className="TitleComponent"> 
          <div className='first-part-TitleComponent'>
              <div className='icon'><HiMenu/>&nbsp;&nbsp;&nbsp;</div>
              <div className='icon'><TbHome/>&nbsp;&nbsp;&nbsp;</div>
              <div className='component-input'><input className='a-first' type='text' placeholder='&nbsp;Buscar'/><CiSearch className='input-icon'/></div>
          </div>
          <div className='last-part-TitleComponent'>
              <button className='button-star-pro'><BsFillStarFill className='start-icon'/>&nbsp;&nbsp;Actualizar a Pro&nbsp;&nbsp;&nbsp;</button>
              <div className='icon'>&nbsp;&nbsp;<BiPlus/>&nbsp;&nbsp;&nbsp;</div>
              <div className='icon'><BsQuestionSquare/>&nbsp;&nbsp;&nbsp;</div>
              <div className='icon'><BiPieChart/>&nbsp;&nbsp;</div>
              <div className='a-last'>2/5&nbsp;&nbsp;&nbsp;</div>
              <div className='icon'><VscNewFile/></div>
          </div>
      </div> 
    ); 
  } 
    
    export default TitleComponent;