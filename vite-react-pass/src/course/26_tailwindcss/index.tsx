import styles from './index.module.css'
import hxh from './hxh.module.css'
export function TestTailwindcss(){
    return <>
    <div className="hxh p-4 m-5 text-red-200 hover:text-amber-200 text-[23px] aaa-[14px] hxh-primary g-l">
        <button className={styles['hxh-primary']+hxh['my-local']}>run</button>
        5</div>
    </>
}