import PageContainer from "@/app/components/page/page";

export default function Quiz({
  title = `Quiz`,
  className = `quiz`,
}: any) {
  return (
    <PageContainer title={title} desc={`This is the ${title}`} showSidebar={true}>
      <div className={className}>
        {title}
      </div>
    </PageContainer>
  )
}