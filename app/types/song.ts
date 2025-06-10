// types/song.ts
import type { Song, Section } from '@prisma/client'

export type SongWithSections = Song & {
  sections: Section[]
}

export type SectionType = 'solo' | 'chorus' | 'verse' | 'bridge' | 'call' | 'response'

export type FormSection = {
  type: SectionType
  label: string
  lyrics: string
}

export type SongFormData = {
  title: string
  key: string
  sections: FormSection[]
}