import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

// DBに接続するためのPrismaクライアントを生成→prismaの中にschema.prismaにある全てのモデルが入り、操作できる
const prisma = new PrismaClient()

// GETという関数名はGETリクエストの時にこの関数を呼ぶという意味
export const GET = async (request: NextRequest) => {
  try {
    // DBからPost一覧を取得
    const posts = await prisma.post.findMany({ // prisma.post：Postモデルを対象、findMany()：全ての投稿を取得
      include: { // include：関連するテーブルも取得
        postCategories: {
          include: {
            category: {
              select: { // categoryテーブルからはidとnameのみ取得
                id: true,
                name: true,
              },
            },
          },
        },
      },
      orderBy: { // 作成日時降順で取得
        createdAt: 'desc',
      },
    })
    // 成功レスポンスを返す
    return NextResponse.json({status: 'OK', posts: posts}, {status: 200})
  } catch (error) { // tryブロックの中で起きたエラーが入る
    // error instanceof Error：errorがErrorクラスのオブジェクトかどうかを確認する
    if (error instanceof Error) return NextResponse.json({ status: error.message }, {status: 400})
  }
}
