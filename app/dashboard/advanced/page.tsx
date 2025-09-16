import { SearchParamsWrapper } from "@/components/search-params-wrapper"

export default function AdvancedPage() {
  return (
    <SearchParamsWrapper>
      <AdvancedPageContent />
    </SearchParamsWrapper>
  )
}

function AdvancedPageContent() {
  return (
    <div>
      <h1>Advanced Dashboard</h1>
      <p>This is the advanced dashboard page.</p>
    </div>
  )
}
