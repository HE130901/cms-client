/**
 * v0 by Vercel.
 * @see https://v0.dev/t/kgvTysjC0k4
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
export default function Component() {
  return (
    <div className="flex flex-col h-screen w-screen bg-white dark:bg-gray-950">
      <header className="flex flex-col items-center justify-center h-[40%] bg-[url('/placeholder.svg')] bg-cover bg-center">
        <div className="flex flex-col items-center justify-center space-y-4 text-white">
          <img
            src="/placeholder.svg"
            width={200}
            height={200}
            alt="Restaurant Logo"
            className="rounded-full"
          />
          <h1 className="text-5xl font-bold">The Gourmet Grill</h1>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto">
        <section className="py-12 px-8 md:px-16 lg:px-24">
          <h2 className="text-3xl font-bold mb-6">Appetizers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex flex-col items-start space-y-2">
              <img
                src="/placeholder.svg"
                width={400}
                height={300}
                alt="Appetizer 1"
                className="rounded-lg w-full h-48 object-cover"
              />
              <h3 className="text-xl font-bold">Crispy Calamari</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Lightly fried calamari rings served with a zesty marinara sauce.
              </p>
              <p className="font-bold">$12.95</p>
            </div>
            <div className="flex flex-col items-start space-y-2">
              <img
                src="/placeholder.svg"
                width={400}
                height={300}
                alt="Appetizer 2"
                className="rounded-lg w-full h-48 object-cover"
              />
              <h3 className="text-xl font-bold">Bruschetta</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Toasted bread topped with fresh tomatoes, basil, and balsamic
                glaze.
              </p>
              <p className="font-bold">$8.95</p>
            </div>
            <div className="flex flex-col items-start space-y-2">
              <img
                src="/placeholder.svg"
                width={400}
                height={300}
                alt="Appetizer 3"
                className="rounded-lg w-full h-48 object-cover"
              />
              <h3 className="text-xl font-bold">Meatballs</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Homemade meatballs in a rich marinara sauce, served with garlic
                bread.
              </p>
              <p className="font-bold">$10.95</p>
            </div>
          </div>
        </section>
        <section className="py-12 px-8 md:px-16 lg:px-24 bg-gray-100 dark:bg-gray-800">
          <h2 className="text-3xl font-bold mb-6">Entrees</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex flex-col items-start space-y-2">
              <img
                src="/placeholder.svg"
                width={400}
                height={300}
                alt="Entree 1"
                className="rounded-lg w-full h-48 object-cover"
              />
              <h3 className="text-xl font-bold">Grilled Salmon</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Fresh salmon fillet grilled to perfection, served with roasted
                vegetables and lemon butter sauce.
              </p>
              <p className="font-bold">$24.95</p>
            </div>
            <div className="flex flex-col items-start space-y-2">
              <img
                src="/placeholder.svg"
                width={400}
                height={300}
                alt="Entree 2"
                className="rounded-lg w-full h-48 object-cover"
              />
              <h3 className="text-xl font-bold">Steak Frites</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Grilled ribeye steak served with crispy french fries and garlic
                aioli.
              </p>
              <p className="font-bold">$28.95</p>
            </div>
            <div className="flex flex-col items-start space-y-2">
              <img
                src="/placeholder.svg"
                width={400}
                height={300}
                alt="Entree 3"
                className="rounded-lg w-full h-48 object-cover"
              />
              <h3 className="text-xl font-bold">Chicken Parmesan</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Breaded and fried chicken breast topped with marinara sauce and
                melted mozzarella, served with pasta.
              </p>
              <p className="font-bold">$19.95</p>
            </div>
          </div>
        </section>
        <section className="py-12 px-8 md:px-16 lg:px-24">
          <h2 className="text-3xl font-bold mb-6">Desserts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex flex-col items-start space-y-2">
              <img
                src="/placeholder.svg"
                width={400}
                height={300}
                alt="Dessert 1"
                className="rounded-lg w-full h-48 object-cover"
              />
              <h3 className="text-xl font-bold">Tiramisu</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Classic Italian dessert made with layers of espresso-soaked
                ladyfingers and mascarpone cream.
              </p>
              <p className="font-bold">$8.95</p>
            </div>
            <div className="flex flex-col items-start space-y-2">
              <img
                src="/placeholder.svg"
                width={400}
                height={300}
                alt="Dessert 2"
                className="rounded-lg w-full h-48 object-cover"
              />
              <h3 className="text-xl font-bold">Crème Brûlée</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Rich and creamy custard with a caramelized sugar topping.
              </p>
              <p className="font-bold">$9.95</p>
            </div>
            <div className="flex flex-col items-start space-y-2">
              <img
                src="/placeholder.svg"
                width={400}
                height={300}
                alt="Dessert 3"
                className="rounded-lg w-full h-48 object-cover"
              />
              <h3 className="text-xl font-bold">Chocolate Lava Cake</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Warm, gooey chocolate cake with a molten center, served with
                vanilla ice cream.
              </p>
              <p className="font-bold">$10.95</p>
            </div>
          </div>
        </section>
        <section className="py-12 px-8 md:px-16 lg:px-24 bg-gray-100 dark:bg-gray-800">
          <h2 className="text-3xl font-bold mb-6">Drinks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex flex-col items-start space-y-2">
              <img
                src="/placeholder.svg"
                width={400}
                height={300}
                alt="Drink 1"
                className="rounded-lg w-full h-48 object-cover"
              />
              <h3 className="text-xl font-bold">Signature Cocktail</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Our house-made cocktail featuring premium spirits, fresh juices,
                and a unique blend of flavors.
              </p>
              <p className="font-bold">$12.95</p>
            </div>
            <div className="flex flex-col items-start space-y-2">
              <img
                src="/placeholder.svg"
                width={400}
                height={300}
                alt="Drink 2"
                className="rounded-lg w-full h-48 object-cover"
              />
              <h3 className="text-xl font-bold">Craft Beer</h3>
              <p className="text-gray-500 dark:text-gray-400">
                A rotating selection of local and regional craft beers.
              </p>
              <p className="font-bold">$7.95</p>
            </div>
            <div className="flex flex-col items-start space-y-2">
              <img
                src="/placeholder.svg"
                width={400}
                height={300}
                alt="Drink 3"
                className="rounded-lg w-full h-48 object-cover"
              />
              <h3 className="text-xl font-bold">Non-Alcoholic Mocktail</h3>
              <p className="text-gray-500 dark:text-gray-400">
                A refreshing non-alcoholic cocktail made with fresh fruits and
                herbs.
              </p>
              <p className="font-bold">$5.95</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
