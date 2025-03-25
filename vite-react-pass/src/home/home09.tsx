import { Aaa,Icond } from "../course/09_icon/testIcon";
import { IconAdd } from "../course/09_icon/Icon/IconAdd";
import { createIconFont } from "../course/09_icon/Icon/createIconFont";
const IconFont = createIconFont('//at.alicdn.com/t/c/font_4443338_a2wwqhorbk4.js');
export default function Home09() {
    return <>
    <h2>Home09-icon</h2>
    <Aaa style={{color:'red'}} className="hxh"/>
    <Icond style={{color:'red'}} spin> 
    <path d="M853.333333 480H544V170.666667c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v309.333333H170.666667c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h309.333333V853.333333c0 17.066667 14.933333 32 32 32s32-14.933333 32-32V544H853.333333c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32z"></path>
    </Icond>

    <IconAdd/>
    <IconFont type="icon-shouye-zhihui" size="40px"></IconFont>
    <IconFont type="icon-gerenzhongxin-zhihui" fill="blue" size="40px" spin></IconFont>
    </>
}