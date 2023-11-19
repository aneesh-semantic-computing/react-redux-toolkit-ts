import { Form, NavLink, Outlet, useLocation, useLoaderData, useNavigation, useSubmit, redirect } from "react-router-dom";
import { createContact, getContacts } from "../contacts";
import { useEffect, useRef } from "react";

export async function loader({ request }:any) : Promise<any> {
  const url = new URL(request.url);
  const search = url.searchParams.get("search") as string || "";
  const contacts = await getContacts(search);
  return { contacts, search };
}

export async function action() {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}


export default function Root() {
  const currentRoute = useLocation();
  const { contacts, search } = useLoaderData() as any;
  const navigation = useNavigation();
  const searchInput = useRef<HTMLInputElement>(null);
  const submit = useSubmit();
  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has(
      "search"
    );


  useEffect(() => {
    if(searchInput.current) searchInput.current.value = search;
  }, [search]);

  if(currentRoute.pathname.includes('/reserve')) {
    return (
      <Outlet/>
    );
  }

  return (
    <div className="wrapper">
      <div id="sidebar">
        <h1>Contacts</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              className={searching ? "loading" : ""}
              type="search"
              name="search"
              defaultValue={search}
              ref={searchInput}
              onChange={(event) => {
                const isFirstSearch = search == null;
                submit(event.currentTarget.form, { replace: !isFirstSearch });
              }}
            />
            <div
              id="search-spinner"
              aria-hidden
              hidden={!searching}
            />
            <div
              className="sr-only"
              aria-live="polite"
            ></div>
          </Form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact:any) => (
                <li key={contact.id}>
                  <NavLink to={`contacts/${contact.id}`} className={({ isActive, isPending }) =>
                      isActive
                        ? "active"
                        : isPending
                        ? "pending"
                        : ""
                    }>
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div id="detail" className={
          navigation.state === "loading" ? "loading" : ""
        }>
          <Outlet/>
      </div>
    </div>
  );
}
