import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// 記事作成APIに送られてくるリクエストボディの型を定義
export interface CreatePostRequestBody {
  title: string
  content: string
  categories: {id: number}[]
  thumbnailUrl: string
}

export const GET = async (request: NextRequest) => {
  try {
    const posts = await prisma.post.findMany({
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
      orderBy: {
        createdAt: 'desc',
      },
    })
    return NextResponse.json({ status: 'OK', posts: posts }, { status: 200 })
  } catch (error) {
    if (error instanceof Error) return NextResponse.json({ status: error.message }, {status: 400})
  }
}

export const POST = async (request: NextRequest, context: any) => {
  try {
    // リクエストの中のbodyを取得
    const body = await request.json()

    // bodyの中から取り出す
    const { title, content, categories, thumbnailUrl }: CreatePostRequestBody = body

    // prismaのpostモデルに対してcreateメソッドを使い、新しいレコードをINSERTする
    const data = await prisma.post.create({
      data: {
        title,
        content,
        thumbnailUrl,
      },
    })

    for (const category of categories) {
      await prisma.postCategory.create({
        data: {
          categoryId: category.id,
          postId: data.id,
        },
      })
    }

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
