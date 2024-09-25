/*
------------------------ANOTAÇÕES REACT------------------------

*REACT HOOKS

-> sempre que um state é alterado o componente é reconstruido.

-> useState (tem um estado inicial e cada vez que muda atualiza o estado)
    const [email, setEmail] = useState('');

    <input value={email} onChange={e => setEmail(e.target.value)} />

-> useEffect
    -so vai executar o que está no useEffect quando o componente for inicializado.
    - muito bom para chamada de API, como carregar informações.

    ex: useEffect(() => {
    vai executar o que está aqui 
    }, [sempre que o que estiver aqui for alterado]);

->useMemo
- é o mesmo que o useEffect porem mais performatico
 pq se alterar outra coisa ele não vai ser executado

 ex: const emailLength = useMemo(() => {
    return email.length * 1000;
 }, [email.length]);

 -> useCallback
 - é o mesmo do useMemo porem mais simples, para memorizar funções.
 a função so vai executar se for alterado o que tiver nos arrei de dependencias.

 ex: const handleEntrar = useCallback(() => {
    console.log(email)
 }, [email]);

->useRef
- consegue pegar a referencia de um elemento

ex: 
 const inputPasswordRef = useRef<HTML.InputElement>(null);

*CONTEXT
-> ultilizar o useCallback para compartilhar funções no contexto

onClick?.()   a função é undifined? se não executa.



overflow="auto" -> se o componente é maior que a pagina so ele tem scroll
whiteSpace="nowrap" -> testo grande não quebrar linha


*/