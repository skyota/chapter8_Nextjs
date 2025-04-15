import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'
import { supabase } from "@/app/_utils/supabase";

const prisma = new PrismaClient()

export interface UpdateCategoryBody {
  name: string
}

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } },
) => {
  const { id } = params

  const token = request.headers.get('Authorization') ?? ''

  const { error } = await supabase.auth.getUser(token)

  if (error)
    return NextResponse.json({ status: error.message }, { status: 400 })

  try {
    const category = await prisma.category.findUnique({
      where: {
        id: parseInt(id),
      },
    })
    return NextResponse.json({ status: 'OK', category: category }, { status: 200 })
  } catch (error) {
    if (error instanceof Error) return NextResponse.json({ status: error.message }, { status: 400 })
  }
}

export const PUT = async (
  request: NextRequest,
  { params }: { params: { id: string } },
) => {
  const { id } = params
  const body = await request.json()
  const { name }: UpdateCategoryBody = body

  const token = request.headers.get('Authorization') ?? ''

  const { error } = await supabase.auth.getUser(token)

  if (error)
    return NextResponse.json({ status: error.message }, { status: 400 })

  try {
    const category = await prisma.category.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
      },
    })
    return NextResponse.json({status: 'OK', category: category}, {status: 200})
  } catch (error) {
    if (error instanceof Error) return NextResponse.json({status: error.message}, {status: 400})
  }
}

export const DELETE = async (
  request: NextRequest,
  {params} : {params: {id: string}},
) => {
  const {id} = params

  const token = request.headers.get('Authorization') ?? ''

  const { error } = await supabase.auth.getUser(token)

  if (error)
    return NextResponse.json({ status: error.message }, { status: 400 })

  try {
    await prisma.category.delete({
      where: {
        id: parseInt(id),
      },
    })
    return NextResponse.json({status: 'OK', message: '削除しました'}, {status: 200})
  } catch (error) {
    if (error instanceof Error) return NextResponse.json({status: error.message}, {status: 400})
  }
}
