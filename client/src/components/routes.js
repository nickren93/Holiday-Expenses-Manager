import App from './App';
import Home from './Home';
import NewExpense from './NewExpense';
import HolidayExpenses from './HolidayExpenses';
import CategoryExpenses from './CategoryExpenses';
import MyHolidays from './MyHolidays';
import MyCategories from './MyCategories';
import NewHoliday from './NewHoliday';
import NewCategory from './NewCategory';

const routes = [
    {
        path: '/',
        element: <App />,
        // errorElement: <ErrorPages />,
        children: [
            {
                path: '/',
                element: <Home />,
                children: [
                    {
                        path: '/expense/new',
                        element: <NewExpense />
                    },
                    // {
                    //     path:  '/holidays/:holiday_id/expenses',
                    //     element: <HolidayExpenses />
                    // },
                    {
                        path: "/holidays/:holiday_id/expenses/:year",
                        element: <HolidayExpenses />
                    },
                    {
                        path:  '/categories/:category_id/expenses',
                        element: <CategoryExpenses />
                    },
                    {
                        path: '/myholidays',
                        element: <MyHolidays />
                    },
                    {
                        path: '/mycategories',
                        element: <MyCategories />
                    },
                    {
                        path:`/newexpenses/newholiday`,
                        element: <NewHoliday />
                    },
                    {
                        path:`/newexpenses/newcategory`,
                        element: <NewCategory />
                    },
                ]
            },
        ]
    }
]

export default routes;

