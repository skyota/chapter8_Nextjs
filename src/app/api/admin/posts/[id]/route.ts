import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getUser } from "@/app/_utils/getUser";

const prisma = new PrismaClient()

export interface UpdatePostRequestBody {
  title: string
  content: string
  categories: { id: number }[]
  thumbnailUrl: string
}

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } },
) => {
  const { id } = params

  const { data, error } = await getUser(request);

  if (error)
    return NextResponse.json({ status: error.message }, { status: 400 })

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        postCategories: {
          include: {
            category: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    })
    return NextResponse.json({ status: 'OK', post: post }, { status: 200 })
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
  const { title, content, categories, thumbnailUrl }: UpdatePostRequestBody = body

  const { data, error } = await getUser(request);

  if (error)
    return NextResponse.json({ status: error.message }, { status: 400 })

  try {
    const post = await prisma.post.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title,
        content,
        thumbnailUrl
      },
    })
    
    // 中間テーブルのレコードを削除→記事とカテゴリの関係をリセットする
    await prisma.postCategory.deleteMany({
      where: {
        postId: parseInt(id),
      },
    })

    for (const category of categories) {
      await prisma.postCategory.create({
        data: {
          postId: post.id,
          categoryId: category.id,
        },
      })
    }
    return NextResponse.json({ status: 'OK', post: post }, {status: 200})
  } catch (error) {
    if (error instanceof Error) return NextResponse.json({ status: error.message }, { status: 400 })
  }
}

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } },
) => {
  const { id } = params

  const { data, error } = await getUser(request);

  if (error)
    return NextResponse.json({ status: error.message }, { status: 400 })

  try {
    await prisma.post.delete({
      where: {
        id: parseInt(id),
      },
    })
    return NextResponse.json({ status: 'OK', message: '削除しました' }, { status: 200 })
  } catch (error) {
    if (error instanceof Error) return NextResponse.json({ status: error.message }, { status: 400 })
  }
}
