import Page from "@/app/components/page/page";

export default function Profile({
  title = `Profile`,
  className = `profile`,
}: any) {
  return (
    <Page title={title} desc={`This is the ${title}`} showSidebar={true}>
      <div className={className}>
        {title}
      </div>
    </Page>
  )
}