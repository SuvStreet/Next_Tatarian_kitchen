import IngredientsTable from '@/components/UI/tables/ingredients'
import IngredientForm from '@/forms/ingredient.form'

const IngredientsPage = () => {
  return (
    <div>
      <IngredientForm />
      <IngredientsTable />
    </div>
  )
}

export default IngredientsPage
