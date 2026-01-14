
interface Props<T> {
    title:string
    list: Array<T>
    onEdit: ()=>void
    onDelete: ()=>void
    onAdd: ()=>void
}

export function CardList<T>({title, list}:Props<T>) {
    return (
        <>
          <p>title</p>
          {list.map((e) => (
            <QueryCard
              key={e.label}
              // this should use a formArray id
              queryItem={e}
            />
          ))}
          <MutationSheet />
        </>
}
