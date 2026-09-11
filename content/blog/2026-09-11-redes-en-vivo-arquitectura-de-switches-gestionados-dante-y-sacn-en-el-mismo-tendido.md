---
title: 'Redes en Vivo: Arquitectura de switches gestionados, Dante y sACN en el mismo tendido'
date: 2026-09-11T15:26:00
thumbnail: /asset/img/blog/Gemini_Generated_Image_5dnhet5dnhet5dnh.jpg
description: |-
  Tirar una línea de red dedicada para cada protocolo en un festival o congreso de gran escala ya no es viable ni eficiente. La convergencia de audio multicanal (Dante), control de iluminación (sACN / Art-Net) y telemetría de sistemas (L-Acoustics Network Manager, d&b R1, Shure Wireless Workbench) sobre un mismo enlace troncal es el estándar de la industria, siempre que la infraestructura esté gobernada por switches gestionados L2/L3 configurados con precisión quirúrgica.
  Sin aislamiento y priorización estricta, el tráfico broadcast y multicast saturará los búferes de los microcontroladores de iluminación y destruirá el reloj de sincronización del audio, generando cortes (audio dropouts) y pérdida de sincronismo en directo.
author: DSH Team
category: Tecnología
---

**1. Topología L2: Segmentación por VLANs**

El aislamiento de dominios de difusión es mandatorio. Todos los protocolos conviven físicamente en los enlaces troncales (_Trunk links_), pero permanecen aislados lógicamente a nivel de capa 2:

| **VLAN ID** | **Nombre de Red** | **Protocolo / Dispositivos** | **Tipo de Tráfico** | **Modo de Puerto** |
| **VLAN 10** | `AUDIO_DANTE_PRI` | Consolas, stageboxes, procesadores PA | Multicast / Unicast UDP | Access (Equipos) / Trunk (Backbone) |
| **VLAN 20** | `LIGHTING_sACN` | Consolas grandMA, nodos DMX, luminarias | Multicast UDP (E1.31) | Access / Trunk |
| **VLAN 30** | `SYSTEM_CONTROL` | Shure WWB, DSP control, amplificadores | TCP/IP / Broadcast | Access / Trunk |
| **VLAN 40** | `AUDIO_DANTE_SEC` | Redundancia Dante (*Redundant mode*) | Multicast / Unicast UDP | Aislada / Switch físico secundario |

> **Regla crítica de Dante:** La red _Secondary_ de Dante nunca debe compartir la misma VLAN ni rutearse dentro del mismo switch con la red _Primary_ si se busca redundancia de hardware real. Para redundancia de enlaces (_link redundancy_) en un único switch, se debe utilizar agregación de puertos (_LACP_).

**2. Priorización de Tráfico: QoS y Sincronización PTP**

Dante depende del protocolo IEEE 1588-2008 Precision Time Protocol (PTPv1 / PTPv2) para alinear las muestras con una precisión de sub-microsegundos. Si los paquetes de _clocking_ se retrasan por una ráfaga de paquetes sACN, el _buffer_ receptor sufrirá _jitter_ y caerá en silencio.

Es obligatorio habilitar **DiffServ (QoS L3)** con mapeo de colas estricto (_Strict Priority Queuing_):

- **DSCP 56 (CS7):** PTP Clocking. Debe asignarse a la cola de máxima prioridad absoluta (Queue 8 o cola más alta).
- **DSCP 46 (EF - Expedited Forwarding):** Flujos de audio Dante. Prioridad inmediatamente inferior (Queue 7 o segunda más alta).
- **DSCP 0 / Best Effort:** sACN, Art-Net, control de amplificadores y tráfico administrativo.

**3. Aislamiento de Tráfico Multicast: IGMP Snooping y Querier**

Tanto el audio Dante _multicast_ como las tramas sACN se transmiten a direcciones IP Clase D (239.x.x.x). Si el switch no inspecciona estos paquetes, los reenvía como _broadcast_ a todos los puertos activos, saturando interfaces de 100 Mbps (típicas en nodos de luces o microfonía inalámbrica).

- **IGMP Snooping v2:** Debe activarse globalmente y en las VLANs 10 y 20 para que el switch entregue el flujo _únicamente_ a los puertos suscritos.
- **IGMP Querier:** Obligatorio. Debe haber **uno y solo un** switch en la red con el _Querier_ activado por VLAN (habitualmente el switch _Core_ de FOH o Control Central). Si no hay un _Querier_ presente, las tablas multicast expiran a los pocos minutos y la señal se interrumpe sin previo aviso.
- **Filtrado de Unregistered Multicast:** Habilitar el bloqueo de tráfico multicast no registrado para evitar fugas hacia puertos de control.

**4. Infraestructura Física y Redundancia de Backbone**

Para evitar el temido punto único de falla (_Single Point of Failure_) en enlaces FOH-Escenario:

1. **Troncal Óptico Blindado:** Utilizar mangueras de fibra óptica táctica de grado de gira (Neutrik opticalCON Duo o Quad) con conectores LC monomodo o multimodo OM3/OM4.
2. **Protocolos de Anillo y Árbol:** Si se usan múltiples switches en topología de anillo o malla, desactivar el Spanning Tree tradicional y configurar **RSTP (802.1w)** o **MSTP**, ajustando el _Bridge Priority_ manualmente (Prioridad 4096 para el Switch Root).
3. **Agregación de Enlaces (LACP - 802.3ad):** Configurar troncales con al menos dos enlaces físicos simultáneos (fibra + cobre o doble fibra) para duplicar ancho de banda y garantizar conmutación por falla transparente (_failover_ menor a 50 ms).
