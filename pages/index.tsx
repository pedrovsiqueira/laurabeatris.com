import { InferGetServerSidePropsType } from 'next'
import { VStack } from '@chakra-ui/react'

import { Heading } from 'components/Base/Heading'
import { Paragraph } from 'components/Base/Paragraph'
import { HighlightLink } from 'components/Base/HighlightLink'
import { ProjectsList } from 'components/ProjectsList'
import { Timeline } from 'components/Timeline'
import { links } from 'constants/links'
import { getDayOfWeek } from 'utils/getDayOfWeek'
import { getTimelineList } from 'graphql/queries/getTimelineList'
import { getStack } from 'graphql/queries/getStack'

const now = new Date()
const dayOfWeek = getDayOfWeek(now.getDate(), now.getMonth(), now.getFullYear())

export async function getServerSideProps () {
  try {
    const timelineList = await getTimelineList()
    const transformedStack = await getStack()

    return {
      props: {
        timelineList,
        transformedStack
      }
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)

    return {
      props: {}
    }
  }
}

export default function Home ({
  timelineList,
  transformedStack
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <VStack
      width='full'
      paddingTop={5}
      paddingBottom={10}
      alignItems='flex-start'
    >
      <Heading as='h1'>
        Happy {dayOfWeek}!
        <br />
        I'm Laura Beatris
      </Heading>

      <Paragraph variant='regular'>
        I'm a Software Engineer at  <HighlightLink href={links.yld}>YLD</HighlightLink> and Content Creator.
        Teaching and creating solutions are my favorite things in the world. <span role='img' aria-hidden='true'>🚀</span>
      </Paragraph>

      <ProjectsList transformedStack={transformedStack} />
      <Timeline timelineList={timelineList} />
    </VStack>
  )
}
