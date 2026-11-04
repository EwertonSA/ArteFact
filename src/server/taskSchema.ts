import z from "zod";

export const taskSCreationSchema=z.object({
title:z.string().min(1,'Title is required'),
description:z.string().min(1,'Description is required')
})
export const taskUpdateSchema = z.object({
  title: z.string().min(1,'Title is required'),
  description: z.string().min(1,'Description is required'),
})