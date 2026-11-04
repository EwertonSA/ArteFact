import z from "zod";

export const taskSCreationSchema=z.object({
title:z.string().min(1,'Title is required'),
description:z.string().min(1,'Description is required')
})
export const taskUpdateSchema=z.object({
title:z.string().min(1).optional(),
description:z.string().min(1).optional()
}).refine(data=>Object.keys(data).length>0,{
message:'At least one field must be provided'
})