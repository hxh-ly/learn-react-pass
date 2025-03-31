import { Lazyload } from "../course/19_reactLazy";

export function Home19(){
    return <>
    <div style={{width:'50%',height:'300px',border:'1px solid green',overflow:'auto'}}>
        <div style={{height:'200px',width:"100%",border:'1px solid red',marginBottom:'100px'}}></div>
    <Lazyload onVisibeCb={()=>{console.log('run')}} offset={200} playholder={<>loading...</>} style={{backgroundColor:'red'}} > 
        <div>hxh</div>
        <div>hxh</div>
        <div>hxh</div>
        <div>hxh</div>
        <div>hxh</div>
        <div>hxh</div>
        <div>hxh</div>
    </Lazyload>
    </div>
  
    </>
}