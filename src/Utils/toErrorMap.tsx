//for generating error message

export const toErrorMap=(errors: { field: string; message: any }[])=>{
const errorMap: Record<string,string>={}
errors.forEach(({field,message})=>{
    errorMap[field] = message
})

return errorMap
}