import Page from "@/app/components/page/page";

export default function Questions({
  title = `Questions`,
  className = `questions`,
}: any) {
  return (
    <Page title={title} desc={`This is the ${title}`} showSidebar={true}>
      <div className={className}>
        {title}
      </div>
    </Page>
  )
}