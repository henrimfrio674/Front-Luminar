import ProductList from '../../components/product/productList/ProductList';
import { ServiceCard } from '../../components/serviceCard/ServiceCard';
import SimpleCarousel from '../../components/carrosel/SimpleCarousel';
import rodrigo from '../../assets/devs/genfoto.jpg';
import henrique from '../../assets/henrique.png';

export function Home() {
  return (
    <div>
      {/* Carrossel de imagens */}
      <div>
        <SimpleCarousel />
      </div>

      {/* Seção de produtos */}
      <div className="max-w-7xl mx-auto mt-12">
        <h2 className="text-3xl font-semibold text-center text-[#220660] mt-4 mb-8">
          Os Mais Vendidos
        </h2>
        {/* Aqui estamos passando a prop limit para exibir apenas 3 produtos */}
        <ProductList limit={3} />
      </div>

      {/* Seção de informações e equipe */}
      <div className="flex flex-col mt-4 mb-6">
        <section className="container mx-auto p-8 mt-4 bg-white rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold text-center text-[#220660] mt-2 mb-6">
            Por que escolher a nossa plataforma?
          </h2>
          <p className="text-lg leading-relaxed text-justify mb-8">
            A energia elétrica no Brasil passou por aumentos significativos nos últimos anos; nossa plataforma surge como uma solução inovadora para ajudar empresas e consumidores a adotarem práticas sustentáveis e economizarem em suas contas de energia. Com o preço da energia dobrando desde 2013, promovemos o uso de fontes renováveis como uma alternativa viável para o futuro.
          </p>

          <h2 className="text-3xl font-semibold text-center text-[#220660] mt-2 mb-6">Nosso Objetivo</h2>
          <p className="text-lg leading-relaxed text-justify mb-8">
            Nosso objetivo é criar um espaço que conecte empresas, fornecedores e organizações não-governamentais comprometidos com a energia limpa e sustentável. Aqui, todos podem colaborar para encontrar soluções que promovam a eficiência energética e o uso de energias renováveis.
          </p>

          {/* Seção da equipe */}
          <h3 className="text-2xl font-semibold text-[#220660] mb-6 text-center">Nossa Equipe</h3>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="text-center">
              <a href="https://www.linkedin.com/in/rodrigo-dias-196985236/">
                <img src={rodrigo} alt="Rodrigo Dias" className="rounded-full mx-auto mb-4 shadow-lg h-[150px]" />
                <h4 className="text-xl font-semibold text-[#220660]">Rodrigo Dias</h4>
                <p className="text-gray-600">Desenvolvedor Fullstack</p>
              </a>
            </div>

            <div className="text-center">
              <a href="https://www.linkedin.com/in/henrique-luiz-felix-de-araujo/">
                <img src={henrique} alt="Henrique Araújo" className="rounded-full mx-auto mb-4 shadow-lg h-[150px]" />
                <h4 className="text-xl font-semibold text-[#220660]">Henrique Araújo</h4>
                <p className="text-gray-600">Desenvolvedor Fullstack</p>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
