import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'
import { supabase } from "@/app/_utils/supabase";

export interface CreateCategoryRequestBody {
  name: string
}

const prisma = new PrismaClient()

export const GET = async (request: NextRequest) => {
  const token = request.headers.get('Authorization') ?? ''

  const { error } = await supabase.auth.getUser(token)

  if (error)
    return NextResponse.json({ status: error.message }, { status: 400 })

  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
    return NextResponse.json({ status: 'OK', categories: categories }, { status: 200 })
  } catch (error) {
    if (error instanceof Error) return NextResponse.json({ status: error.message }, { status: 400 })
  }
}

export const POST = async (request: NextRequest, context: any) => {
  const token = request.headers.get('Authorization') ?? ''

  const { error } = await supabase.auth.getUser(token)

  if (error)
    return NextResponse.json({ status: error.message }, { status: 400 })

  try {
    const body = await request.json()
    const { name }: CreateCategoryRequestBody = body
    const data = await prisma.category.create({
      data: {
        name,
      },
    })
    return NextResponse.json({
      status: 'OK',
      message: '作成しました',
      id: data.id,
    })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ status: error.message }, { status: 400 })
    }
  }
}
