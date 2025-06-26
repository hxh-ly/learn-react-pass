import { strFromU8, strToU8, unzlibSync, zlibSync } from "fflate"
import JSZip from "jszip"
import {saveAs} from 'file-saver'
export function fileName2Language(fileName:string):string {
    const suffix = fileName.split('.').pop()||''
    if(['js','jsx'].includes(suffix)) {return 'javascript'};
    if (['ts', 'tsx'].includes(suffix)) return 'typescript'
    if (['json'].includes(suffix)) return 'json'
    if (['css'].includes(suffix)) return 'css'
    return 'javascript'
}

export function compress(data: string): string {
    const buffer = strToU8(data)
    const zipped = zlibSync(buffer, { level: 9 })
    const str = strFromU8(zipped, true)
    return btoa(str)
}


export const uncompress = (base64: string) => {
  const binary = atob(base64); // 二进制字符串
  const buffer = strToU8(binary, true);
  const upzipped = unzlibSync(buffer);
  return strFromU8(upzipped);
};

export async function downFiles(files) {
    const zip = new JSZip();
    Object.keys(files).forEach(key=>{
        zip.file(key,files[key].value)
    })
  const blob = await zip.generateAsync({ type: 'blob' })
    saveAs(blob,`code${Math.random().toString().slice(2,6)}.zip`)
}