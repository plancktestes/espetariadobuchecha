import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent 
} from "@/components/ui/card";
import { Zap, Settings, Support } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="py-20 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
            Transforme suas ideias em realidade
          </h1>
          <p className="mb-8 text-lg text-muted-foreground max-w-2xl mx-auto">
            Plataforma poderosa para criar aplicativos incríveis com facilidade
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="default"
              size="lg"
            >
              Começar grátis
            </Button>
            <Button 
              variant="outline"
              size="lg"
            >
              Como funciona
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <Card className="h-full">
              <CardHeader className="text-center">
                <Zap className="mx-auto h-8 w-8 text-primary mb-4" />
                <CardTitle>Design Intuitivo</CardTitle>
                <CardDescription className="mt-2">
                  Interface moderna e fácil de usar que acelera seu desenvolvimento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Arraste e solte componentes, personalize temas e veja suas mudanças em tempo real.
                </p>
              </CardContent>
            </Card>
            
            {/* Feature 2 */}
            <Card className="h-full">
              <CardHeader className="text-center">
                <Settings className="mx-auto h-8 w-8 text-primary mb-4" />
                <CardTitle>Integração Fácil</CardTitle>
                <CardDescription className="mt-2">
                  Conecte-se às suas ferramentas favoritas sem complicações
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Integração nativa com Supabase, APIs REST e webhooks para expandir funcionalidades.
                </p>
              </CardContent>
            </Card>
            
            {/* Feature 3 */}
            <Card className="h-full">
              <CardHeader className="text-center">
                <Support className="mx-auto h-8 w-8 text-primary mb-4" />
                <CardTitle>Suporte dedicado</CardTitle>
                <CardDescription className="mt-2">
                  Ajuda especializada quando você precisar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Documentação completa, tutoriais em vídeo e comunidade ativa para tirar suas dúvidas.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold tracking-tight">
            Pronto para começar?
          </h2>
          <p className="mb-8 text-lg text-muted-foreground max-w-xl mx-auto">
            Junte-se a milhares de desenvolvedores que já estão construindo o futuro com nossa plataforma.
          </p>
          <Button 
            variant="default"
            size="lg"
            className="mx-auto"
          >
            Criar minha conta grátis
          </Button>
        </div>
      </section>
    </div>
  );
}