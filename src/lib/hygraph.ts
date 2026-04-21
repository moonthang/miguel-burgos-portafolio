type GraphQLResponse<T> = {
  data: T;
  errors?: { message: string }[];
};

export async function fetchHygraph<T>(
  query: string,
  variables: Record<string, any> = {},
  locales: string[] = ['en']
): Promise<T> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (process.env.HYGRAPH_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.HYGRAPH_TOKEN}`;
  }
  
  const body = {
    query,
    variables: { ...variables, locales },
  };

  const response = await fetch(process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT!, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body),
    next: { revalidate: 10 },
  });

  if (!response.ok) {
    console.error(
      'Hygraph request failed with status:',
      response.status,
      response.statusText
    );
    throw new Error('Failed to fetch API');
  }

  const json: GraphQLResponse<T> = await response.json();

  if (json.errors) {
    console.error('Hygraph API Error:', json.errors);
    throw new Error('Failed to fetch API');
  }

  return json.data;
}
