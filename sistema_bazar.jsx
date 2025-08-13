import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

export default function BazarSystem() {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [estoque, setEstoque] = useState("");
  const [vendas, setVendas] = useState([]);

  const adicionarProduto = () => {
    if (!nome || !preco || !estoque) return;
    setProdutos([...produtos, { id: Date.now(), nome, preco: parseFloat(preco), estoque: parseInt(estoque) }]);
    setNome("");
    setPreco("");
    setEstoque("");
  };

  const registrarVenda = (id) => {
    setProdutos(produtos.map(p => p.id === id ? { ...p, estoque: p.estoque - 1 } : p));
    const produtoVendido = produtos.find(p => p.id === id);
    setVendas([...vendas, { ...produtoVendido, data: new Date().toLocaleString() }]);
  };

  return (
    <div className="p-4 grid gap-4 md:grid-cols-2">
      <Card>
        <CardContent>
          <h2 className="text-xl font-bold mb-2">Cadastrar Produto</h2>
          <Input placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} className="mb-2" />
          <Input placeholder="Preço" type="number" value={preco} onChange={(e) => setPreco(e.target.value)} className="mb-2" />
          <Input placeholder="Estoque" type="number" value={estoque} onChange={(e) => setEstoque(e.target.value)} className="mb-2" />
          <Button onClick={adicionarProduto}>Adicionar</Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h2 className="text-xl font-bold mb-2">Produtos</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead>Estoque</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {produtos.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>{p.nome}</TableCell>
                  <TableCell>R$ {p.preco.toFixed(2)}</TableCell>
                  <TableCell>{p.estoque}</TableCell>
                  <TableCell>
                    <Button size="sm" onClick={() => registrarVenda(p.id)} disabled={p.estoque <= 0}>Vender</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardContent>
          <h2 className="text-xl font-bold mb-2">Relatório de Vendas</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Produto</TableHead>
                <TableHead>Preço</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendas.map((v, index) => (
                <TableRow key={index}>
                  <TableCell>{v.data}</TableCell>
                  <TableCell>{v.nome}</TableCell>
                  <TableCell>R$ {v.preco.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
